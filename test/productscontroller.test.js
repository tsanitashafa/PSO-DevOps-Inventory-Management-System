// Kita mock seluruh model di bagian paling atas SEBELUM meng-import controller 
// agar Jest mem-bypass error pencarian path Mongoose internalnya.
jest.mock("../src/models/Products/ProductsModel", () => ({}), { virtual: true });
jest.mock("../src/models/Returns/ReturnProductsModel", () => ({}), { virtual: true });
jest.mock("../src/models/Purchases/PurchaseProductsModel", () => ({}), { virtual: true });
jest.mock("../src/models/Sales/SaleProductsModel", () => ({}), { virtual: true });

// Mocking file-file service yang dipanggil oleh controller produk
const CreateService = require("../src/services/common/CreateService");
const UpdateService = require("../src/services/common/UpdateService");
const DetailsByIDService = require("../src/services/common/DetailsByIDService");
const ListTwoJoinService = require("../src/services/common/ListTwoJoinService");
const CheckAssociateService = require("../src/services/common/CheckAssociateService");
const DeleteService = require("../src/services/common/DeleteService");
const DropDownService = require("../src/services/common/DropDownService");

jest.mock("../src/services/common/CreateService");
jest.mock("../src/services/common/UpdateService");
jest.mock("../src/services/common/DetailsByIDService");
jest.mock("../src/services/common/ListTwoJoinService");
jest.mock("../src/services/common/CheckAssociateService");
jest.mock("../src/services/common/DeleteService");
jest.mock("../src/services/common/DropDownService");

// Ambil file controller asli kamu (Sesuaikan path ini dengan letak file controllermu)
const ProductsController = require("../src/controllers/Products/ProductsController");

describe("PRODUCTS CONTROLLER LAYER TEST", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();
        // Simulasi objek Request dan Response Express
        req = {
            headers: { email: "admin@gmail.com" },
            body: { Name: "Laptop ASUS", Unit: "Pcs", Details: "Core i7" },
            params: { id: "60d5ecb8b4259b1d1f84d111", searchKeyword: "ASUS" }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test("1. CreateProducts Controller should forward request to CreateService", async () => {
        CreateService.mockResolvedValue({ status: "success", data: "Product Created" });
        
        await ProductsController.CreateProducts(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ status: "success", data: "Product Created" });
    });

    test("2. UpdateProducts Controller should forward request to UpdateService", async () => {
        UpdateService.mockResolvedValue({ status: "success", data: "Product Updated" });
        
        await ProductsController.UpdateProducts(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("3. ProductsDetailsByID Controller should forward request to DetailsByIDService", async () => {
        DetailsByIDService.mockResolvedValue({ status: "success", data: { Name: "Laptop" } });
        
        await ProductsController.ProductsDetailsByID(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("4. ProductsList Controller should trigger ListTwoJoinService with aggregation stages", async () => {
        ListTwoJoinService.mockResolvedValue({ status: "success", data: [{ Name: "ASUS ROG" }] });
        
        await ProductsController.ProductsList(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(ListTwoJoinService).toHaveBeenCalled();
    });

    test("5. DeleteProduct Controller should handle associated return/purchase/sales validation safely", async () => {
        // Simulasi jika produk TIDAK terikat transaksi apa pun (Aman dihapus)
        CheckAssociateService.mockResolvedValue(false); 
        DeleteService.mockResolvedValue({ status: "success", data: "Deleted" });

        await ProductsController.DeleteProduct(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("6. DeleteProduct Controller should reject deletion if product is associated with Return Records", async () => {
        // Simulasi terikat data Return
        CheckAssociateService.mockResolvedValueOnce(true); 

        await ProductsController.DeleteProduct(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "associate" }));
    });

    test("7. ProductsDropDown Controller should trigger DropDownService mapping", async () => {
        DropDownService.mockResolvedValue({ status: "success", data: [] });
        
        await ProductsController.ProductsDropDown(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
    });
    
    test("8. DeleteProduct Controller should reject deletion if product is associated with Purchase Records", async () => {
        // Simulasi CheckAssociateService mendeteksi produk terikat dengan Purchase
        CheckAssociateService.mockResolvedValueOnce(false); // Return false
        CheckAssociateService.mockResolvedValueOnce(true);  // Purchase true

        await ProductsController.DeleteProduct(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: "This Product is associated with Purchase Product, so it cannot be deleted." }));
    });

    test("9. DeleteProduct Controller should reject deletion if product is associated with Sales Records", async () => {
        // Simulasi CheckAssociateService mendeteksi produk terikat dengan Sales
        CheckAssociateService.mockResolvedValueOnce(false); // Return false
        CheckAssociateService.mockResolvedValueOnce(false); // Purchase false
        CheckAssociateService.mockResolvedValueOnce(true);  // Sales true

        await ProductsController.DeleteProduct(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: "This Product is associated with Sales Product, so it cannot be deleted." }));
    });
});