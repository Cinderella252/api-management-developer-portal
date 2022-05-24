﻿import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { StyleDefinition } from "@paperbits/common/styles";
import { ProductSubscribeModel } from "./productSubscribeModel";
import * as DefaultStyleDefinitions from "../../defaultStyleDefinitions"
import { cloneDeep } from "lodash";

export class ProductSubscribeHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "productSubscribe",
            category: "Products",
            displayName: "Product: Subscribe form",
            iconClass: "widget-icon widget-icon-api-management",
            requires: ["html"],
            createModel: async () => new ProductSubscribeModel()
        };

        return widgetOrder;
    }

    public getStyleDefinitions(): StyleDefinition {
        return {
            colors: {
                borderColor: {
                    displayName: "Input border color",
                    defaults: {
                        value: "#505050"
                    }
                }
            },
            components: {
                productSubscribe: {
                    displayName: "Product Subscribe",
                    plugins: ["background", "typography", "margin", "padding"],
                    defaults: {
                        typography: {
                            colorKey: "colors/tryItColor"
                        }
                    },
                    components: {
                        subscriptionInput: cloneDeep(DefaultStyleDefinitions.Input),
                        termsOfUseCheckbox: {
                            displayName: "Terms Of Use Checkbox",
                            plugins: ["typography"]
                        },
                        termsOfUseTextarea: {
                            displayName: "Terms Of Use",
                            plugins: ["backround", "typography", "size", "border"]
                        },
                        subscribeButton: {
                            displayName: "Button",
                            plugins: ["background", "typography", "states", "shadow", "size", "margin", "border", "padding"],

                        }
                    }
                }
            }
        };
    }
}