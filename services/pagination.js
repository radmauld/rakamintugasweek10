const pagination = (page,limit, data) => {
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
}


    const result = {};

    if (startIndex > 0) {
        result.previous = {
            page: page + 1
            limit: limit,
        };
    }

    if (endIndex < data.length) {
        result.next = {
            page : page + 1
            limit: limit,
        }
    }

    result.result = data.slice(startIndex, endIndex);
    return result;

    export default pagination;