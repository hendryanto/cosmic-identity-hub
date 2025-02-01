import { useState } from "react";
import Navbar from "../components/Navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProductsManager from "../components/admin/ProductsManager";
import CampaignManager from "../components/admin/CampaignManager";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto pt-24 px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <Tabs defaultValue="products" className="w-full">
          <TabsList>
            <TabsTrigger value="products">Products Management</TabsTrigger>
            <TabsTrigger value="campaign">Campaign Products</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <ProductsManager />
          </TabsContent>
          
          <TabsContent value="campaign">
            <CampaignManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;