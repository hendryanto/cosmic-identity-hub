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
import { Trash2, Pencil, Search, Filter } from "lucide-react";
import { useToast } from "../../ui/use-toast";
import { useState } from "react";
import { Input } from "../../ui/input";

interface ProductListProps {
  onEdit?: (product: Product) => void;
}

const ProductList = ({ onEdit }: ProductListProps) => {
  const { toast } = useToast();
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

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

  const filteredProducts = products?.filter(product => {
    const nameMatch = product.name.toLowerCase().includes(nameFilter.toLowerCase());
    const categoryMatch = product.category.toLowerCase().includes(categoryFilter.toLowerCase());
    return nameMatch && categoryMatch;
  });

  // Function to get image URL or fallback
  const getImageUrl = (product: Product) => {
    if (product.images && product.images[0]) {
      return product.images[0];
    }
    return "https://via.placeholder.com/50";
  };

  if (!products) return <div>Loading...</div>;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span>Name</span>
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  placeholder="Filter by name..."
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  className="h-8 w-full"
                />
              </div>
            </TableHead>
            <TableHead>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span>Category</span>
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  placeholder="Filter by category..."
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="h-8 w-full"
                />
              </div>
            </TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <img
                  src={getImageUrl(product)}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/50";
                  }}
                />
              </TableCell>
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