# 使用IntelliJ Idea查看Java字节码

---------------------------------------------------------------------

- File -> Settings -> Tools -> External Tools
- Click "+" to Create Tool
    - **Programs:** $JDKPath$\bin\javap.exe
    - **Parameters:** -c $FileClass$
    - **Working directory:** $OutputPath$
- Class File you wanna see byte code
- Right-hand button -> External Tools -> Select the tool you just define


---------------------------------------------------------------------

- [Intellij idea快速查看Java类字节码](http://blog.csdn.net/qq_24489717/article/details/53837493)