import prisma from "../../db/prismaDb"


export async function getNganHangs() {

    try {
        return await prisma.tbNganHang.findMany({
            select: {
                id: true,
                TenNganHang: true,
                Status: true,
            }
        })
    } catch (e: unknown) {
        console.log(`Error getting ngan hang: ${e}`)
    }
}

export async function getNganHangById(id: string) {
    try {
        return await prisma.tbNganHang.findUnique({
            where: {
                id: id
            }
        })
        
    } catch (e: unknown) {
        console.log(`Error getting ngan hang: ${e}`)
    }
}

export async function createNganHang(nganhang: any) {
    try {
        return await prisma.tbNganHang.create({
            data: {
                TenNganHang: nganhang.TenNganHang,
            }
        })
        
    } catch (e: unknown) {
        console.log(`Error getting ngan hang: ${e}`)
    }
}

export async function updateNganHang(id: string, nganhang: any) {
    try {
        return await prisma.tbNganHang.update({
            where: {
                id: id
            },
            data: nganhang
        })
        
    } catch (e: unknown) {
        console.log(`Error getting ngan hang: ${e}`)
    }
}

export async function deleteNganHang(id: string) {
    try {
        return await prisma.tbNganHang.delete({
            where: {
                id: id
            }
        })
        
    } catch (e: unknown) {
        console.log(`Error getting ngan hang: ${e}`)
    }
}