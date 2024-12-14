"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: 1,
                        refetchOnWindowFocus: true,
                        staleTime: 1000 * 60 * 10,
                        // @ts-expect-error: Custom type mismatch that doesn't affect runtime behavior
                        cacheTime: 1000 * 60 * 5,
                    },
                },
            })
    );

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
