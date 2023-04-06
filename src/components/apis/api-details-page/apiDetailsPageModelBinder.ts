import { Contract, Bag } from "@paperbits/common";
import { IModelBinder } from "@paperbits/common/editing";
import { ApiDetailsPageContract } from "./apiDetailsPageContract";
import { ApiDetailsPageModel } from "./apiDetailsPageModel";

export class ApiDetailsPageModelBinder implements IModelBinder<ApiDetailsPageModel> {
    public canHandleContract?(contract: Contract): boolean {
        return contract.type === "apiDetailsPage";
    }

    public canHandleModel?(model: ApiDetailsPageModel, widgetName?: string): boolean {
        return model instanceof ApiDetailsPageModel;
    }

    public modelToContract(model: ApiDetailsPageModel): ApiDetailsPageContract {
        const contract: ApiDetailsPageContract = {
            type: "apiDetailsPage",
            styles: model.styles,
            groupOperationsByTag: model.groupOperationsByTag,
            showUrlPath: model.showUrlPath,
            wrapText: model.wrapText
        };

        return contract;
    }

    public async contractToModel(contract: any, bindingContext?: Bag<any>): Promise<ApiDetailsPageModel> {
        const model = new ApiDetailsPageModel();
        model.styles = contract.styles || {};
        model.groupOperationsByTag = contract.groupOperationsByTag || false;
        model.showUrlPath = contract.showUrlPath || false;
        model.wrapText = contract.wrapText || false;

        return model;
    }

}