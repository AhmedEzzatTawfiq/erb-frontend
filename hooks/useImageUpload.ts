
import { useEffect, useRef, useState } from 'react';

const DEFAULT_ALLOWED_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
];

interface UseImageUploadOptions {
    maxSizeMB?: number;
    allowedTypes?: string[];
}

export function useImageUpload({
    maxSizeMB = 5,
    allowedTypes = DEFAULT_ALLOWED_TYPES,
}: UseImageUploadOptions = {}) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!file) {
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const input = event.currentTarget;
        const selectedFile = input.files?.[0];


        setError(null);

        if (!selectedFile) return;

        if (!allowedTypes.includes(selectedFile.type)) {
            setFile(null);
            setError('Please select a JPG, PNG or WEBP image.');
            input.value = '';
            return;
        }

        if (selectedFile.size > maxSizeMB * 1024 * 1024) {
            setFile(null);
            setError(`Image size must be less than ${maxSizeMB}MB.`);
            input.value = '';
            return;
        }

        setFile(selectedFile);
    };

    const removeImage = () => {
        setFile(null);
        setPreview(null);
        setError(null);

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return {
        inputRef,
        file,
        preview,
        setPreview,
        error,
        setError,
        handleImageChange,
        removeImage,
    };
}
