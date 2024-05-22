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
        const existingNganHang = await prisma.tbNganHang.findUnique({
            where: {
                id: nganhang.id
            }
        });

        if (existingNganHang) {
            throw new Error("Mã ngân hàng đã tồn tại trong dữ liệu của bạn. Vui lòng nhập mã ngân hàng khác!");
        }

        return await prisma.tbNganHang.create({
            data: {
                id: nganhang.id,
                TenNganHang: nganhang.TenNganHang,
            }
        });
        
    } catch (e: any) {
        if (e.message === "Mã ngân hàng đã tồn tại trong dữ liệu của bạn. Vui lòng nhập mã ngân hàng khác!") {
            throw e; // Ném lỗi trùng ID
        } else {
            throw new Error("Lỗi xảy ra khi tạo dữ liệu ngân hàng.");
        }
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