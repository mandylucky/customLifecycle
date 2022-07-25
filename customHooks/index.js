import Vue from 'vue';
const notify=(name,vm)=>{
    const lifeCycles = vm.$options[name]
    if (lifeCycles && lifeCycles.length) {
        lifeCycles.forEach(lifecycle => {
            lifecycle.call(vm)
        })
    }
    if (vm.$children && vm.$children.length) {
        vm.$children.forEach(child => {
            notify(name, child)
        })
    }
}
const customHooks={
    // 初始化
    init(){
        const optionMergeStrategies = Vue.config.optionMergeStrategies
        optionMergeStrategies.pageVisible = optionMergeStrategies.created
        optionMergeStrategies.pageHidden = optionMergeStrategies.created
    },
    observe(vm){
        document.addEventListener("visibilitychange", function() {
            if (document.visibilityState === 'hidden') {
                // 用户离开了当前页面
                notify('pageHidden',vm)
            }
            if (document.visibilityState === 'visible') {
                // 用户打开或回到页面
                notify('pageVisible',vm)
            }
        });
    },
}
export default customHooks