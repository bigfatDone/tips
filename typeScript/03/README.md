# 第三天学习

- 如果可能的话，总是倾向于使用联合类型的参数，而不是重载

- object is not Object. Always use object!(Object指的是全局原型链尽头的Object，我们平常用的是{})

- 未知类型表示任何值。这类似于任何类型，但是更安全，因为任何未知值都是不合法的:unknow对于任何值都是不合法的，相反any对于任何值都是合法的。

- 对于fn = () => void，是可以返回任意类型，并且不会报错，这是void的特殊用法。
