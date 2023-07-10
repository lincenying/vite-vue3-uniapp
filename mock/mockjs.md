cSpell:disable

### 布尔值
```javascript
Random.boolean( min?, max?, current? )

Mock.mock('@boolean(1, 9, true)') // false
```

### 数值型
```javascript
Random.integer( min?, max? )

Mock.mock('@integer(60, 100)') // 63
```

### 浮点型
```javascript
Random.float( min?, max?, dmin?, dmax? )

Mock.mock('@float(60, 100, 3, 5)') // 94.25887
```

### 字符型
```javascript
Random.string( pool?, min?, max? )

Random.string('lower', 5) // "tsxcl"
```

### 范围
```javascript
Random.range(start?, stop, step?)

Mock.mock('@range(1, 10, 2)') // [1,3,5,7,9]
```

### 日期型
```javascript
Random.date( format? )
Mock.mock('@date("yyyy-MM-dd")') // "2003-04-28"

Random.time( format? )
Mock.mock('@time("HH:mm:ss")') // "18:12:17"

Random.datetime( format? )
Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")') // "1997-05-14 14:49:05"

Random.now( unit?, format? )
Mock.mock('@now("yyyy-MM-dd HH:mm:ss")') // "2023-03-19 14:11:02"
```

### 图片
```javascript
Random.image( size?, background?, foreground?, format?, text? )
Random.image('200x100', '#50B347', '#FFF', 'Mock.js')

Random.dataImage( size?, text? )
Random.dataImage('200x100', 'Hello Mock.js!')
```

### 文本-段落
```javascript
Random.cparagraph( min?, max? )

Mock.mock('@cparagraph(1, 3)')
```

### 文本-句子
```javascript
Random.csentence( min?, max? )

Mock.mock('@csentence(3, 5)')
```

### 文本-单词
```javascript
Random.cword( min?, max? )

Mock.mock('@cword(3, 5)') // "今进话"
```

### 文本-标题
```javascript
Random.ctitle( min?, max? )

Mock.mock('@ctitle(3, 5)') // "争道将其该"
```

### 姓名
```javascript
Random.cname()

Mock.mock('@cname()') // "高敏"
```

### 邮箱
```javascript
Random.email()

Mock.mock('@email()') // "a.hngndzt@qzupu.ag"
```

### IP
```javascript
Random.ip()

Mock.mock('@ip()') // "152.161.240.135"
```

### URL
```javascript
Random.url()

Mock.mock('@url()') // "mid://sskgcif.cu/ewsmb"
```

### 地址
```javascript
// 区域
Random.region()
Mock.mock('@region()') // "西南"

// 省份
Random.province()
Mock.mock('@province()') // "福建省"

// 市
Random.city( prefix? )
Mock.mock('@city()') // "银川市"
Mock.mock('@city(true)') // "山西省 大同市"

// 区县
Random.county( prefix? )
Mock.mock('@county()') // "海晏县"
Mock.mock('@county(true)') // "黑龙江省 哈尔滨市 方正县"

// 邮编
Random.zip()
Mock.mock('@zip()') // "953634"
```
