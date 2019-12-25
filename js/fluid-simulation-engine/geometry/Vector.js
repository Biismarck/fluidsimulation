define(function () {
	//定义向量
	function Vector(arg1, arg2) {		//Vector(x, y), Vector(vec)
		if(typeof arg1 === "object") {
			this.x = arg1.x;
			this.y = arg1.y;
		}
		else {
			this.x = arg1;
			this.y = arg2;
		}
		return this;
	}
	//两点间距离
	Vector.prototype.getDistance = function(vec) {
		return Math.sqrt((vec.x-this.x)*(vec.x-this.x) + (vec.y-this.y)*(vec.y-this.y));
	}
	//获取向量长度
	Vector.prototype.getLength = function() {
		return Math.sqrt(this.x*this.x + this.y*this.y);
	}
	//加上目标向量
	Vector.prototype.add = function(vec) {
		this.x += vec.x;
		this.y += vec.y;
		return this;
	}
	//减去目标向量
	Vector.prototype.subtract = function(vec) {
		this.x -= vec.x;
		this.y -= vec.y;
		return this;
	}
	//关于原点对称
	Vector.prototype.invert = function() {
		this.x *= -1;
		this.y *= -1;
		return this;
	}
	//沿原方向长度增加dl
	Vector.prototype.extendBy = function(dl) {
		var length = this.getLength();
		var sin = this.y / length;
		var cos = this.x / length;
		this.x += dl*cos;
		this.y += dl*sin;
		return this;
	}
	//沿原方向长度变为原来的n倍
	Vector.prototype.multiplyBy = function(n) {
		var length = this.getLength();
		if(length !== 0) {
			var newLength = n*length;
			var sin = this.y / length;
			var cos = this.x / length;
			this.x = newLength*cos;
			this.y = newLength*sin;
		}
		return this;
	}
	//过当前向量终点与目标向量垂直的向量
	Vector.prototype.getNormalVector = function(vec) {
		return new Vector(this).subtract(this.getTangentVector(vec));
	}

	Vector.prototype.getTangentVector = function(vec) {
		var vecLength = vec.getLength();
		var L = (this.x*vec.x + this.y*vec.y)/vecLength;
		var cos = vec.x/vecLength;
		var sin = vec.y/vecLength;
		return new Vector(L*cos,L*sin);
	}

	Vector.prototype.multiplyNormalAndTangentComponents = function(referenceVector, tangentMultiplier, normalMultiplier) {
		var vn = this.getTangentVector(referenceVector);
		var vt = this.getNormalVector(referenceVector);
		vt.multiplyBy(tangentMultiplier);
		vn.multiplyBy(normalMultiplier);
		var resultVector = vt.add(vn);
		this.x = resultVector.x;
		this.y = resultVector.y;
		return this;
	}
	//获取向量组中长度最短向量
	Vector.findTheShortestVector = function(vectorsArray) {
		var shortestVector = vectorsArray[0];
		var shortestLength = shortestVector.getLength();
		for(let k = 0; k < vectorsArray.length; k++) {
			var length = vectorsArray[k].getLength();
			if(length < shortestLength) {
				shortestVector = vectorsArray[k];
				shortestLength = length;
			}
		}
		return shortestVector;
	}
	return Vector;
});
