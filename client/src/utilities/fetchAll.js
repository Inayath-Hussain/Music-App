import fetchData from "./fetchData";

const fetchAll = async (given_url) => {
    let items = [];
    let url = given_url;
    let end_result;
    while (true) {
        const result = await fetchData(url)
        items = [...items, ...result.data.items]
        url = result.data.next
        if (!url) {
            end_result = result.data
            end_result.items = items
            break
        }
    }
    return end_result
}

export default fetchAll;