"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const goal_model_1 = require("../goal/goal.model");
class GoalGeneral extends goal_model_1.Goal {
    constructor() {
        super(...arguments);
        this.sellerCode = null;
        this.amount = null;
        this.currentAmount = null;
    }
}
exports.GoalGeneral = GoalGeneral;
//# sourceMappingURL=goal-general.model.js.map