import { IOperationWorth, IOperation } from "src/interfaces/operation.interface";

const operationValues: IOperationWorth = {
    multiplication: 1,
    division: 1,
    substract: 2,
    add: 2
};

const addOperationPoll = (operations: IOperation[], operation: IOperation): IOperation[] => {
    operations.push(operation);
    return operations;
};

export const statusList = {
    STARTED: "started",
    RESULT: "result",
    TIPING: "tiping"
}

export const operationTypes = [
    {
        name: "equal",
        signature: "=",
        action: function (value: number, operations: IOperation[] ): number {
            operations.sort((a, b) => operationValues[a.type] - operationValues[b.type]);

            for (let operation of operations) {
                switch (operation.type) {
                    case "add": 
                        value + operation["value"];
                        break;
                }
            }

            return value;
        }
    },
    {
        name: "add",
        signature: "+",
        action: addOperationPoll
    }
]

export const valueState = [
    {
        name: "negativeToggle",
        signature: "+/-",
        action: (value: number) => {value = value * -1; return value}
    },
    {
        name: "percentage",
        signature: "%",
        action: (value: number) => {value = value / 100; return value}
    },
    {
        names: ["reset", "delete"],
        signatures: ["AC", "«"],
        actions: [
            (value: number, operations: IOperation[], status: string, element: HTMLElement) => {
                element.innerHTML = String(0);
                value = 0;
                operations = [];
                status = statusList.STARTED;
            },
            ()
        ]
    }
]

export const digits = [7,8,9,4,5,6,1,2,3];