import ProductCard from '../components/Productcard';
import ProductDetailModal from '../components/ProductCardModal';
import { useEffect, useState } from 'react';
import AdvertisementBanner from '../components/add';
import axiosInstance from '../components/axiosInstance';

const HeroSection = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("product/API/");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleViewDetails = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProduct(null), 300);
    };

    return (
        <>
            <div className="min-h-screen py-24 px-6">
                <AdvertisementBanner />

                {/* Product Grid - Removed wrapper motion.div animations */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onViewDetails={handleViewDetails}
                        />
                    ))}
                </div>
            </div>

            {/* Product Detail Modal */}
            <ProductDetailModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default HeroSection;