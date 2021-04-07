# Select 选择器

用于收纳大量选项的信息录入类组件。

### 何时使用

需要在有限的空间展示大量选项，并从中选取单个或多个选项；

常用于表单内的信息录入。

### 1.1.单选选择器

定义：提供单选的选择器，选取后只展示单个内容。

使用场景：通用场景，不设置宽度时，select及下拉选项宽度根据已选项变换。

{{ base }}

### 1.2.多选选择器

定义：提供多选的选择器，通过标签展示多选内容。

使用场景：通用场景。

{{ multiple }}

### 1.3.分组选择器

定义：对信息进行分组的选择器，能够直观呈现方便用户辨识。

使用场景：有层级关系，但选项内容较少的场景（选项内容量大且需要分层，建议使用极联选择器或树状选择器）。

{{ group }}

### 1.4.可定制选择器

定义：可根据需求定制选择器内容。

使用场景：复杂逻辑或有特定诉求的业务场景。

{{ custom }}

### 1.5.可过滤选择器

定义：输入过滤已选项。

使用场景：有特定诉求的业务场景。

{{ filterable }}
### 1.6.可创建新条目选择器

定义：允许用户创建新条目，需配合filterable使用。

使用场景：有特定诉求的业务场景。

{{ creatable }}

### 1.7.不同尺寸选择器

定义：各尺寸的选择器。

使用场景：根据需求使用，下拉弹出样式支持popupProps。

{{ size }}

### 1.8.直传options选择器

定义：直传options选择器。

使用场景：对于t-option无特殊要求时，便于书写。

{{ options }}

### 1.9.无边框选择器

定义：无边框选择器。

使用场景：不需要显示边框时使用，如文本选择器。

{{ noborder }}

### 1.10.限制可选数目选择器

定义：限制多选选择器的最大可选数目。

使用场景：需要限制多选可选数目时使用。

{{ maxLimit }}

### 1.11.不可用选择器

定义：选择器不可用状态。

使用场景：不可选时使用。

{{ disabled }}

### 1.12.有前缀图标的选择器

定义：可定制前缀图标。

使用场景：按需使用。

{{ prefix }}

### 1.13.已选值为对象的选择器

定义：定制已选项输出值类型。

使用场景：需要输出为对象时使用。

{{ labelInValue }}

### 1.14.定制数据keys

定义：定制数据keys。

使用场景：options数据key不为label或value时使用。

{{ keys }}