function fn(styles, index = 0) {
    styles.map((item, key) => {
        if (key == index) {
            item["class"] = 'now';
        } else {
            item["class"] = '';
        }
    });
    return {
        index,
        styles
    }
}
module.exports = {
    fn:fn
}