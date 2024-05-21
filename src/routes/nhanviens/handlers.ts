import prisma from "../../db/prismaDb"


export async function getNhanViens() {

    try {
        return await prisma.tbNhanVien.findMany({
            select: {
                id: true,
                name: true,
                NgaySinh:true,
            }
        })
    } catch (e: unknown) {
        console.log(`Error getting nhan vien: ${e}`)
    }
}

export async function getNhanVienById(id: string) {
    try {
        return await prisma.tbNhanVien.findUnique({
            where: {
                id: id
            }
        })
        
    } catch (e: unknown) {
        console.log(`Error getting nhan vien: ${e}`)
    }
}

export async function createNhanVien(NhanVien: any) {
    try {
        return await prisma.tbNhanVien.create({
            data: {
                name: NhanVien.name,
                NgaySinh: NhanVien.NgaySinh
            }
        })
        
    } catch (e: unknown) {
        console.log(`Error getting nhan vien: ${e}`)
    }
}

export async function updateNhanVien(id: string, NhanVien: any) {
    try {
        return await prisma.tbNhanVien.update({
            where: {
                id: id
            },
            data: NhanVien
        })
        
    } catch (e: unknown) {
        console.log(`Error getting nhan vien: ${e}`)
    }
}

export async function deleteNhanVien(id: string) {
    try {
        return await prisma.tbNhanVien.delete({
            where: {
                id: id
            }
        })
        
    } catch (e: unknown) {
        console.log(`Error getting nhan vien: ${e}`)
    }
}