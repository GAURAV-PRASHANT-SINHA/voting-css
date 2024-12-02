import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useParams } from 'react-router-dom';
import { createProductAction, updateProductAction } from "../../../redux/slices/products/productSlices";

import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";

//animated components for react-select
const animatedComponents = makeAnimated();

export default function AddProduct() {
  const dispatch = useDispatch();
  //files
  const [file, setFiles] = useState([]);
  const [fileErrs, setFileErrs] = useState([]);
  //file handlechange
  const fileHandleChange = (event) => {
    const newFiles = Array.from(event.target.files);
    //validation
    const newErrs = [];
    
    setFiles(newFiles);
    setFileErrs(newErrs);
  };
  //Sizes
 
  //converted sizes
 
  //---form data---
  const [formData, setFormData] = useState({
    name: "",
    totalQty: "",
    price:0,
    
  });
  const { id } = useParams();
  //onChange
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //get product from store
  const { product, isAdded, loading, error } = useSelector(
    (state) => state?.products
  );

  //onSubmit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(fileErrs);
    //dispatch
    dispatch(
      updateProductAction({
        ...formData,
        file,
        id
      }))
    //reset form data
    setFormData({
      name: "",
    
      price: 0,
      totalQty: "",
    });
    setFiles([]);
  };

  return (
    <>
      {error && <ErrorMsg message={error?.message} />}
      {fileErrs?.length > 0 && (
        <ErrorMsg message="file too large or upload an image" />
      )}
      {isAdded && <SuccessMsg message="Product Added Successfully" />}
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          MANAV WILL EDIT YOUR Product
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-indigo-600 hover:text-indigo-500">
              Manage Products
            </p>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleOnSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <div className="mt-1">
                  <input
                    name="name"
                    value={formData?.name}
                    onChange={handleOnChange}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* size option */}
            
              {/* Select category */}
              
              {/* upload images */}
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Upload Images
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload files</span>
                          <input
                            multiple
                            onChange={fileHandleChange}
                            type="file"
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 1MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* price */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <div className="mt-1">
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleOnChange}
                    type="number"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Total Quantity
                </label>
                <div className="mt-1">
                  <input
                    name="totalQty"
                    value={formData.totalQty}
                    onChange={handleOnChange}
                    type="number"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* description */}
              
              
              <div>
                {loading ? (
                  <LoadingComponent />
                ) : (
                  <button
                    disabled={fileErrs?.length > 0}
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add Product
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
