import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";
import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";


//initalsState
const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

//create product action
export const createProductAction = createAsyncThunk(
  "product/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
      const {
        name,
        price,
        totalQty,
        file,
      } = payload;
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      //FormData
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("countInStock", totalQty);

        formData.append("file", file);
      

      const { data } = await axios.post(
        "http://localhost:4000/api/products/create",
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//create product action
export const updateProductAction = createAsyncThunk(
  "product/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
      const {
        name,
        description,
        category,
        sizes,
        brand,
        colors,
        price,
        totalQty,
        id,
      } = payload;
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:4000/api/products/update/${id}`,
        { 
          name,
          description,
          category,
          sizes,
          brand,
          colors,
          price,
          totalQty,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);



//fetch products action
export const fetchProductsAction = createAsyncThunk(
  "product/list",
  async (_,{ rejectWithValue, getState, dispatch }) => {
    
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get("http://localhost:4000/api/products");
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteProductsAction = createAsyncThunk(
  "product/delete",
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
console.log("zdlkjm");
      // Use axios.delete to make a DELETE request
      const { data } = await axios.delete(`http://localhost:4000/api/products/delete/${id}`, config);
      return data; // Returning data to be handled in the slice
    } catch (error) {
      return rejectWithValue(error?.response?.data); // Handling errors
    }
  }
);


//fetch product action
export const fetchProductAction = createAsyncThunk(
  "product/details",
  async (productId, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${baseURL}/products/${productId}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//slice
const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isAdded = false;
    });
    builder.addCase(createProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    //update
    builder.addCase(updateProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isUpdated = true;
    });
    builder.addCase(updateProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isUpdated = false;
      state.error = action.payload;
    });
    //fetch all
    builder.addCase(fetchProductsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.isAdded = false;
    });
    builder.addCase(fetchProductsAction.rejected, (state, action) => {
      state.loading = false;
      state.products = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    //fetch all
    builder.addCase(fetchProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isAdded = false;
    });
    builder.addCase(fetchProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    //reset error
 
    
    //reset error
    builder.addCase(deleteProductsAction.pending, (state, action) => {
      state.loading = true;
    });
    //reset success
    builder.addCase(deleteProductsAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteProductsAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    //reset error
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.error = null;
    });
    //reset success
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
    });



  },
});

//generate the reducer
const productReducer = productSlice.reducer;

export default productReducer;