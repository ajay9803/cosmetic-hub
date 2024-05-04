import React, { useEffect, useRef } from "react";
import FreeDeliveryComp from "./free_delivery_comp";
import ProductDetailsComp from "./product_details_comp";
import useFutureBuilder from "../../hooks/future_builder_hook";
import PetDetailsShimmer from "../../utilities/shimmers/product_details_shimmer";
import LoadError from "../home/load-error";
import { useParams } from "react-router-dom";

const ProductDetails: React.FC = () => {
  const { productId } = useParams();

  const scrollRef = useRef(0);

  const { isLoading, error, data } = useFutureBuilder(
    `http://localhost:8080/products/${productId}`
  );
  useEffect(() => {
    window.scrollTo(0, scrollRef.current);
  }, []);
  return (
    <div className="flex flex-col w-full my-10">
      {isLoading && <PetDetailsShimmer></PetDetailsShimmer>}
      {error && <LoadError message={error.message}></LoadError>}
      {data && (
        <div className="flex flex-col">
          <FreeDeliveryComp></FreeDeliveryComp>
          <ProductDetailsComp product={data.product}></ProductDetailsComp>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;