## todo
- wasm vs skulpt
- chemical editor
- react native

## 服务器
- 云服务器 自动化部署

## java
- 应用开发  如何冲击高并发 体现

## go

## rust


## feature
- github CI CD
- vite react tailwind css
- vite public path
- react router
- hash 路由模式




首评 6800
一键转发 6800
采集评论区 2800
采集手机号 2800

试用多久

研发团队在哪里




前端监控
性能优化


192.168.1.1 - - [10/Oct/2023:13:55:36 +0800] "GET /api/users HTTP/1.1" 200 1234
192.168.1.2 - - [10/Oct/2023:13:55:38 +0800] "POST /api/login HTTP/1.1" 200 532


192.168.1.2
/api/login

function getTopIp() {

const iphash = {}
const apihash = {}
let log
while(log = readLog()) {
const ip = log.split(' - - ')[0]
const api = log.split('')

/^((\d+\.){3}\d+)\b.*?(\/api/.*?)\b/g.exec()

iphash[ip] = (iphash[ip] || 0) + 1
apihash[api] = (apihash[api] || 0) + 1
}

优先队列

function getTop10(hash) {
const result = Object.entries(hash).sort((a, b) => {
return b[1] - a[1]
})
return result.slice(0, 10).map(item => item[0])
}

return {
ipTop:  getTop10(iphash),
apiTop: getTop10(apihash)
}



}