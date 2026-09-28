import { api } from "@/lib/axios";

export interface Customer {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    taxId: string;
}

export async function createCustomer(data: Customer) {
    const response = await api.post('/customers', data)

    console.log('res', response.data)
    return response.data;
}


export async function getCustomers() {
    const response = await api.get('/customers', {
        
    })

    console.log('res', response.data)
    return response.data;
}