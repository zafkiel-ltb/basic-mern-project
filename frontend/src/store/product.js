import {create} from 'zustand'

export const useProductStore = create ((set) => ({  //Giong nhu useState nhung ma no la global
    products: [],
    setProducts : (products) => set({products}),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.image || !newProduct.price){
            return {success: false, message: "Please fill in all fields"}
        }
        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(newProduct), // Data của Product mới tạo sẽ được gửi xuống backend ở đây
            });
            if (!res.ok) {
                const error = await res.json();
                return { success: false, message: error.message || "Server error" };
            }
            const data = await res.json();
            set((state) => ({ products: [...state.products, data.data] }));
            return { success: true, message: "Product created successfully" };
        } catch (error) {
            return { success: false, message: "Something went wrong. Please try again." };
        }
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set ({ products: data.data });
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message}     

        //filter ra những product mà có pid không bằng pid đã xoá để cập nhật UI liền lập tức mà không cần refresh
        set(state => ({products: state.products.filter(product => product._id !== pid)}));
        return {success: true, message: data.message};
    },
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct)
        });
        const data = await res.json();
        if (!data.success) return {success: false, message: data.message};
        //filter ra những product mà có pid không bằng pid đã xoá để cập nhật UI liền lập tức mà không cần refresh
        set((state) => ({
            products: state.products.map((product) => (product._id === pid ? data.data : product)),
        }));
        return {success: true, message: data.message}
    },
}));