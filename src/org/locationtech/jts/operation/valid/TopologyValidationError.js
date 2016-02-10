export default class TopologyValidationError {
	constructor(...args) {
		this.errorType = null;
		this.pt = null;
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [errorType] = args;
						overloads.call(this, errorType, null);
					})(...args);
				case 2:
					return ((...args) => {
						let [errorType, pt] = args;
						this.errorType = errorType;
						if (pt !== null) this.pt = pt.copy();
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	getErrorType() {
		return this.errorType;
	}
	getMessage() {
		return TopologyValidationError.errMsg[this.errorType];
	}
	getCoordinate() {
		return this.pt;
	}
	toString() {
		var locStr = "";
		if (this.pt !== null) locStr = " at or near point " + this.pt;
		return this.getMessage() + locStr;
	}
	getClass() {
		return TopologyValidationError;
	}
}
TopologyValidationError.ERROR = 0;
TopologyValidationError.REPEATED_POINT = 1;
TopologyValidationError.HOLE_OUTSIDE_SHELL = 2;
TopologyValidationError.NESTED_HOLES = 3;
TopologyValidationError.DISCONNECTED_INTERIOR = 4;
TopologyValidationError.SELF_INTERSECTION = 5;
TopologyValidationError.RING_SELF_INTERSECTION = 6;
TopologyValidationError.NESTED_SHELLS = 7;
TopologyValidationError.DUPLICATE_RINGS = 8;
TopologyValidationError.TOO_FEW_POINTS = 9;
TopologyValidationError.INVALID_COORDINATE = 10;
TopologyValidationError.RING_NOT_CLOSED = 11;
TopologyValidationError.errMsg = ["Topology Validation Error", "Repeated Point", "Hole lies outside shell", "Holes are nested", "Interior is disconnected", "Self-intersection", "Ring Self-intersection", "Nested shells", "Duplicate Rings", "Too few distinct points in geometry component", "Invalid Coordinate", "Ring is not closed"];

