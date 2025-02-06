import { useQuery } from "@tanstack/react-query";
import { Product } from "../../../types/product";
import { SERVER_URL } from "../../../config/serverConfig";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Button } from "../../ui/button";
import { Trash2, Pencil } from "lucide-react";
import { useToast } from "../../ui/use-toast";

interface ProductListProps {
  onEdit?: (product: Product) => void;
}

const ProductList = ({ onEdit }: ProductListProps) => {
  const { toast } = useToast();

  const { data: products, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch(`${SERVER_URL}/src/server/products.php`);
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      return data.data as Product[];
    },
  });

  const handleDelete = async (productId: number) => {
    try {
      const response = await fetch(`${SERVER_URL}/src/server/products.php`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: productId }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Success",
          description: "Product deleted successfully",
        });
        refetch();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  if (!products) return <div>Loading...</div>;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onEdit?.(product)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductList;