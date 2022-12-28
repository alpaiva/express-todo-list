class Task {
    constructor(id, creationDate, title, description, scheduleDate, priotity) {
        this._id = id;
        this._title = title;
        this._description = description;
        this._priority = priotity;
        this._scheduleDate = scheduleDate;
        this._creationDate = creationDate;
    }

    flat() {
        return new String('').concat(
            this._id,
            '|',
            this._creationDate,
            '|',
            this._title,
            '|',
            this._description,
            '|',
            this._scheduleDate,
            '|',
            this._priority
        );
    }

    getId() {
        return this._id;
    }

    getCreationDate() {
        return this._creationDate;
    }

    getTitle() {
        return this._title;
    }

    getDescription() {
        return this._description;
    }

    getPriority() {
        return this._priority;
    }

    getScheduleDate() {
        return this._scheduleDate;
    }
}

module.exports = { Task };
