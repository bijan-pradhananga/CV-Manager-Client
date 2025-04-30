"use client";

import API from "@/config/config";
import { useAppSelector } from "@/lib/hooks";
import * as Dialog from "@radix-ui/react-dialog";
import { Trash2, Plus } from "lucide-react";
import { PhotoLoader } from "./loader/pic-loader";

const EditImageDialog = ({ product, onClose, handleDeleteImage, handleUpdateImage }) => {
    const { singleLoading } = useAppSelector((state) => state.product);

    const onDelete = (image) => {
        const imageName = image.split('\\').pop().split('/').pop();
        handleDeleteImage(product._id, imageName);
    };

    const onImageChange = async (files) => {
        if (!files) {
            console.error("No file selected");
            return;
        }

        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append("images", file); // Appends multiple images to the 'images' field
        });
        handleUpdateImage(product._id, formData);
    };

    return (
        <Dialog.Root open={true} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/20" />
                <Dialog.Content
                    className="fixed top-1/2 left-1/2 max-w-lg w-full p-6 bg-white rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2"
                >
                    <Dialog.Title className="text-lg font-medium">Edit Images</Dialog.Title>
                    <Dialog.Description className="text-sm text-gray-500">
                        View and manage images for {product.name}.
                    </Dialog.Description>
                    <div className="mt-4">
                        {singleLoading ? (
                            <PhotoLoader />
                        ) : (
                            <>
                                {product.images?.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-2">
                                        {product.images.map((image, index) => (
                                            <div key={index} className="relative group">
                                                {/* Image */}
                                                <img
                                                    src={`${API.defaults.baseURL}/${image}`}
                                                    alt={`${product.name} Image ${index + 1}`}
                                                    className="w-full aspect-square object-cover rounded"
                                                />
                                                {/* Delete Icon */}
                                                <button
                                                    onClick={() => onDelete(image)}
                                                    className="absolute bottom-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                                                >
                                                    <Trash2 />
                                                </button>
                                            </div>
                                        ))}
                                        {/* Add Plus Button if images are less than 5 */}
                                        {product.images.length < 5 && (
                                            <div className="relative group flex items-center justify-center border-2 border-dashed rounded aspect-square">
                                                {/* Plus Button */}
                                                <label
                                                    htmlFor="addImageInput"
                                                    className="text-gray-400 hover:text-gray-700 transition cursor-pointer"
                                                >
                                                    <Plus size={32} />
                                                </label>
                                                {/* Hidden File Input */}
                                                <input
                                                    id="addImageInput"
                                                    type="file"
                                                    accept="image/*"
                                                    multiple // Enables selecting multiple files
                                                    className="hidden"
                                                    onChange={(e) => onImageChange(e.target.files)} 
                                                />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p>No images available.</p>
                                )}
                            </>
                        )}
                    </div>
                    <div className="mt-6 flex justify-end gap-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Close
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default EditImageDialog;
