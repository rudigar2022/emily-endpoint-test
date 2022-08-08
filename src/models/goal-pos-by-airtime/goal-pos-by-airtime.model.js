"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const goal_model_1 = require("../goal/goal.model");
class GoalPosByAirTime extends goal_model_1.Goal {
    constructor() {
        super(...arguments);
        this.sellerCode = null;
        this.pos = null;
        this.qty = null;
        this.currentQty = null;
        this.customerCode = null;
    }
}
exports.GoalPosByAirTime = GoalPosByAirTime;
//# sourceMappingURL=goal-pos-by-airtime.model.js.map