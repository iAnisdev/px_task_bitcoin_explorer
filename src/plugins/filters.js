import Vue from 'vue'

Vue.filter('sizeToKBs', (value) => {
    if(!value) return 0
    return value / 1000
})

Vue.filter('weightToKWU', (value) => {
    if(!value) return 0
    return value / 1000
})


Vue.filter('timeFormatter', (value) => {
    if(!value) return ''
    var newDate = new Date();
    newDate.setTime(value * 1000);
    return newDate.toUTCString();
})
