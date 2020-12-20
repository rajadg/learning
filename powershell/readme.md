# Powershell
PowerShell is a cross-platform task automation and configuration management framework, consisting of a command-line shell and scripting language. While most shells (bash, etc) accept and return text, PowerShell is built on top of the .NET Common Language Runtime (CLR), and accepts and returns .NET objects.
Windows PowerShell commands, called cmdlets, let you manage the computers from the command line.PowerShell cmdlets are designed to deal with objects. An object is structured information that is more than just the string of characters appearing on the screen. 

### Basics

#### Declaring a variable
Variable name should start with $ and can contain alphanumeric characters and underscore in their names. A variable can be created by typing a valid variable name.
For example:
```powershell
$location = Get-Location
echo $location
```

#### Getting information about an object (variable)
We can use `Get-Member` cmdlet to get information about a variable like this:
```powershell
$location | Get-Member
```

#### Powershell Special Variables
Refer to the list of special variables here: [Special Variables Document](specialVars.md)

#### Powershell File Folder Operations
Refer to the list of sFile Folder Operations here: [File Folder Operations](fileOperations.md)

### Variable declaration
> $variable = value

The name of the variable should be prefixed with a `$` symbol. The assignment of a variable uses simple syntax like python or javascript. 

#### Arrays
```powershell
$ar1 = 1, 2, 3
$ar2 = 1..10
$ar3 = 'one', 2, 3
[int32[]]$ar4 = 1..10
```

#### Hash table
A dictionary or hash table can be declared like this:
```powershell
# declare empty hash table
$empty = @{} 
# or declare a hash table with some contents
$hash = [ordered]@{'one'=1; 'two'=2; 'three' = 3}
echo 'value at three:'
$hash['three']
echo 'all keys:'
$hash.keys
echo 'all values:'
$hash.values
```
Supports properties like: `Count`, `keys`, `values` and methods like `Add`, `Remove` and `GetEnumerator`

#### Expressions
Use the `()` to enclose an expression. Check the output of following example for the importance of `()` to evaluate an expression to its value:
```powershell
$tm = Get-Date
echo ('now:' + $tm.ToString())
# displays in three lines
echo 'total seconds:' + ($tm.hour * 3600 + $tm.minute * 60 + $tm.second)
# displays in single line
echo ('total seconds:'+ ($tm.hour * 3600 + $tm.minute * 60 + $tm.second))
echo ('yesteray:' + $tm.AddDays(-1).ToShortDateString())
echo ('today:' + $tm.ToShortDateString())
echo ('tomorrow:' + $tm.AddDays(1).ToShortDateString())
```

#### Regular expressions
The usual regular expression syntax is supported. We can match a regular expression to a string like this:
> string -match regex
```powershell
# following expressions return true
'test' -match 't*'
'test' -match 't..t'
'sample' -match 's..p..'
"abc" -match "\w*"
"abc" -match "\w{2,3}"
# this expression returns false
"abc" -match "\w{4,5}"
```

#### Backtick operator
The Backtick (\`) operator is also called word-wrap operator. It allows a command to be written in multiple lines. It can also be used to insert new lines (\`n) or tabs (\`t) in the strings.
```powershell
get-process | select -last 5 | Select-Object -Property Name, CPU, `
    SessionId, Id `
    | format-table
Write-host "this text has `n two lines"
Write-host "this text has `t a tab"

```

### Programming
#### `for` loop
There are two ways to write for loops: `for` or `foreach`. Example:
```powershell
$array = @("item1", "item2", "item3")

# iterate using foreach 
foreach ($element in $array) { $element }

# iterate using for loop
for ($i=0; $i -lt $array.length; $i++) { $array[$i]; }

# iterate with foreach from pipe input
$array | foreach { $_ }
```

#### `while` loop
There are two ways to do the while loop. `while...` and `do...while` syntax. Examples:
```powershell
$array = @("item1", "item2", "item3")

# use while loop to iterate an array
$counter = 0;
while($counter -lt $array.length){
   $array[$counter]
   $counter += 1
}

# use do..while loop to iterate an array
$counter = 0;
do {
   $array[$counter]
   $counter += 1
} while($counter -lt $array.length)
```

#### `if` statement
We can use a `if` statement with optional `elseif` and `else` clauses. Example:
```powershell
$average = 5
3..7 | foreach {
    if ($_ -lt $average) {
        echo ($_.ToString() + ' is less than average')
    } elseif ($_ -gt $average) {
        echo ($_.ToString() + ' is greater than average')
    }else {
        echo ($_.ToString() + ' is average')
    }
}
```
Note: nested `if` statements are allowed

#### `switch` statements
The `switch` statement is supported in powershell. Example:
```powershell
# calling switch statement multiple times from a foreach loop
3..7 | foreach {
    switch($_){
    3 { 'three' }
    4 { 'four' }
    5 { 'five'; break; }
    6 { 'six' }
    7 { 'seven' }
     }
}

# supplying an array as input to swtich statement
switch(3..7){
3 { 'three' }
4 { 'four' }
5 { 'five';  break; }
6 { 'six' }
7 { 'seven' }
}
# note: a break; statement here will break the array processing also. 
# So six and seven will not be printed in above statement

```



### Advanced cmdlets

* **`Get-Unique`** cmdlet can be used to get the unique objects from a sorted list of objects.
* **`Measure-Object`** cmdlet can be used to get the properties of the passed output such as min, max, size, count, line etc.
* **`Compare-Object`** cmdlet can be used to compare two objects.
* **`Format-List`** cmdlet can be used to formats the output as a list of properties where a property appears on a new line.
* **`Format-Wide`** cmdlet can be used to formats the output as a table with one property per object.
* **`Where-Object`** cmdlet can be used to select objects having particular property values from the collection of objects that are passed to it.Example: `Get-Service | Where-Object {$_.Status -eq "Stopped"}`
* **`Get-ChildItem`** cmdlet can be used to get the items or child items in one or more specific locations. Example: `Get-ChildItem D:\cmd | Format-Wide`
* **`ForEach-Object`** cmdlet can be used to perform operations on each object of a collection of objects. Example: `1000,2000,3000 | ForEach-Object -Process {$_/1000}`
* **`Start-Sleep`** cmdlet suspends the activity in a script or session for the particular period of time. Example: `Start-Sleep -s 15`
* **`Read-Host`** cmdlet is used to read from the console.. Example: `$choice = Read-Host "Please put your choice"`
* **`Select-Object`** cmdlet is used to select object or its properties.. Example: `get-service | select-object -property name, status, servicetype | format-table`
* **`Sort-Object`** cmdlet is used to sort object by its properties.. Example: `get-service | Sort-Object -Property status | format-table`
* **`Write-Warning`** cmdlet is used to write warning messages. Example: `Write-Warning 'something unexpected might happen.'`
* **`Write-Host`** cmdlet is used to write customized messages.. Example: `Write-Host (2,4,6,8,10,12) -Separator ", -> " -ForegroundColor DarkGreen -BackgroundColor White`
* **`Invoke-Item`** cmdlet is used to perform a default action on specified item. We can open file in default editor, or open url in the default browser, etc. Example: `Invoke-Item "D:\cmd\lines.txt"`
* **`Invoke-Expression`** cmdlet is used to perform a command or expression on local computer. The command supplied can be anything. This is as dangerous as `eval` in javascript. Example: `Invoke-Expression $Command`
* **`Measure-Command`** cmdlet is used to meaure the time taken by script or command.. Example: `Measure-Command { Get-Process }`
* **`Invoke-History`** cmdlet is used to run the command from the current session which are already run.. Example: `Invoke-History`
* **`Add-History`** cmdlet is used to add commands in current history.. Example: `Get-History -count 2 | Add-History `
* **`Get-History`** cmdlet is used to get commands run in current session.. Example: `Get-History -count 2`
* **`Get-Culture`** cmdlet is used to get current culture set in windows.. Example: `(Get-Culture).name` will run get-culture command and then get the name of the culture.
* **`New-Alias`** cmdlet is used to create a alias. Example: `New-Alias -Name help -Value Get-Help` will create a `help` alias, which is same as `Get-Help`. After running this command, we can simply use `help <cmdlet>` to get help of the cmdlet. Example: `help get-process`.

### Operators
* **`Arithmetic operators`**: The arithmetic operators supported are: `+-*/%` ...
* **`Comparison Operators`**: Supported operators are: `-eq`, `-ne`, `-gt`, `-ge`, `-lt`, `-le`, `-like`, `-notLike`, `-match`, `-notMatch`, `-contains`, `-notContains`, `-is`, `-isNot`, etc
* Assignment operators: supported: `=`, `+=`, `-=`
* Logical operators: supported: `-AND`, `-OR`, `-NOT`

* . Example: ``
* . Example: ``
* . Example: ``
* . Example: ``
* . Example: ``
* . Example: ``
* . Example: ``
* . Example: ``
* 