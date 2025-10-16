import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    productList: [],    //출력용 - 2차원 배열
    products: [],        //원본 - 1차원 배열
    product: {}
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        createProduct(state, action) {
            const {productList, products} = action.payload;
            state.productList = productList;
            state.products = products;
        },
        filterProduct(state, action) {
            //const pid = action.payload.pid;
            const {pid} = action.payload;
            // const [fproduct] = state.productList.flat().filter((item) => item.pid === pid);      //[]준건 배열을 구조 분해 할당 한 것
            // state.product = fproduct;
            state.product = state.products.find((item) => item.pid === pid);
        }
    },
})

// Action creators are generated for each case reducer function
export const { createProduct, filterProduct } = productSlice.actions     //API 함수 또는 컴포넌트에서 dispatch(액션함수)

export default productSlice.reducer //store import