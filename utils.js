export const Filter = class {
    /*
    * string: where[]=field,operator,value
    * object: {field, operator, value, name}
    * */
    filterJSON = []

    constructor(fa) {
        if (Array.isArray(fa)) {
            for (let i = 0; i < fa.length; i++) {
                let validation = Filter.validItem(fa[i])
                if (validation.error) {
                    throw validation.message
                } else {
                    this.filterJSON.push(fa[i])
                }
            }
        }
    }

    query() {
        return Filter.jsonToBase64(this.filterJSON)
    }

    json() {
        return this.filterJSON
    }

    add(fi) {
        let validation = Filter.validItem(fi)
        if (validation.error) throw validation.message
        let {found, index} = Filter.findItem(this, fi.name)

        if (found === undefined) this.filterJSON.push(fi)
        else this.filterJSON[index] = fi

        return this
    }

    override(fj) {
        this.filterJSON = fj
        return this
    }

    remove(fi) {
        let {index} = Filter.findItem(this, fi.name)
        if (index >= 0) this.filterJSON.splice(index, 1)

        return this
    }

    static buildFilterStringModelFromObject(fji) {
        delete fji.name
        return `where[]=${Object.values(fji).join(',')}`
    }

    static findItem(filter, name) {
        let found = filter.json().find(fi => fi.name === name),
            index = filter.json().indexOf(found)
        return {found, index}
    }

    static validItem(fi) {
        if (!fi.name) return {
            error: true,
            message: `Key 'name' in filter item is required`
        }
        else return {
            error: false
        }
    }

    static jsonToBase64(json) {
        return `${btoa(JSON.stringify(json))}`
    }
}