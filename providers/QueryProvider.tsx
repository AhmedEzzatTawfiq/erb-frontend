'use client'


import { makeQueryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";


export default function QueryProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    
    const [queryClient] = useState(() => makeQueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}