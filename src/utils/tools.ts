
export const truncateString = (str: string | undefined) => {
    if (!str) return '';
    // 判断字符串长度是否大于 8
    if (str.length > 12) {
        // 保留前 4 位和后 4 位，中间部分用省略号表示
        return str.slice(0, 6) + ' ... ' + str.slice(-6);
    } else {
        // 如果字符串长度不大于 8，则不进行截取
        return str;
    }
}