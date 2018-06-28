'use strict';

function InternalCollection() {
    this.items = [];
}

InternalCollection.prototype.add = function(uid = undefined, data = undefined) {
    this.items.push({
        id: this.items.length,
        uid: uid,
        data: data
    });
};

InternalCollection.prototype.remove = function(index) {
    if ((this.items.length - 1) > index) {
        return;
    }
    this.items.splice(index, 1);
};

InternalCollection.prototype.getFromKey = function(key, value) {
    let userIndex = -1;
    this.items.forEach((element, index) => {
        if (element[key] === value) {
            userIndex = index;
            return true;
        }
    });

    if (userIndex !== -1) {
        return this.items[userIndex];
    }
};

InternalCollection.toString = function() { return "InternalCollection"; };

function Collection() {
    InternalCollection.call(this);
}

Collection.prototype = Object.create(InternalCollection.prototype);
Collection.prototype.constructor = Collection;

Collection.toString = function() { return "Collection"; };