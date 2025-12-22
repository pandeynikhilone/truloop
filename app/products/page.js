import Navigation from "../components/Navigation";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";

export default function ProductsPage() {
  return (
    <div>
        <Navigation/>
        <div className="flex justify-center lg:hidden">{<Search />}</div>
        <div className="m-0">
          <ProductCard/>
        </div>
    </div>
  );
}
