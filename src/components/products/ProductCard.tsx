import { Product } from "../../types/product";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ProductDetail from "../ProductDetail";
import { getIconForProduct } from "../../utils/productIcons";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="text-center">
        {product.images && product.images[0] ? (
          <div className="flex justify-center mb-4">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-48 h-48 object-contain"
            />
          </div>
        ) : (
          <div className="flex justify-center mb-4">
            {getIconForProduct(product.name)}
          </div>
        )}
        <CardTitle className="text-xl">{product.name}</CardTitle>
        <CardDescription className="text-primary font-semibold">
          {product.price}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="space-y-2">
          <h4 className="font-semibold">Features:</h4>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {product.features.slice(0, 3).map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <ProductDetail product={product} />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;