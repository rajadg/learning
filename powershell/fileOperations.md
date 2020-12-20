
## Creating file or folder
### `New-Item`
Use the `New-Item` cmdlet to create a a new file or folder. The `ItemType` parameter value can be used to determine whether it is `File` or `Directory`:
> New-Item [-Path] <file/folder path> -Item-Type <File/Directory> [-Value <file-contents>] [more-params]
- `-Item-Type` can be either `File`, `Directory`, `SymbolicLink`, ...
- `-Value` specify the contents of the new item. example contens of file when creating new file
- `-Force` forcibly overwrite if file/folder already present

### Examples

```powershell
# Create an empty folder
New-Item -Path 'D:\temp\Test Folder' -ItemType Directory

# Create an empty file
New-Item -Path 'D:\temp\Test Folder\sample.txt' -ItemType File

# Create a file with some contents
New-Item -Path 'D:\temp\Test Folder\sample.txt' -ItemType File -Value 'sample content'

# Create a file with some contents, and overwrite any existing contents
New-Item -Path 'D:\temp\Test Folder\sample.txt' -ItemType File -Value 'sample content' -Force
```

## Copying
### `Copy-Item`
We use the `Copy-Item` cmdlet to copy a file / foler to a destination location.
> Copy-Item <path> [-Destination] <destination> [additional-params]

Parameters used:
* `-Destination` is optional, but specifying this option on folder copy ensures files inside folder are also copied. Without `Destination` parameter only folder without contents is copied.
* `-Recurse` ensure the copy of folder is recursive

```powershell
# Only folder is copied without contents
Copy-Item 'D:\temp\Test Folder' 'D:\temp\Test Folder1'

# Copy folder and files but not recursive
Copy-Item 'D:\temp\Test Folder' -Destination 'D:\temp\Test Folder1'

# Copy recursively
Copy-Item 'D:\temp\Test Folder' -Recurse -Destination 'D:\temp\Test Folder1'
```

## Deleting file or folder
### Command: `Remove-Item`
Use the `Remove-Item` cmdlet to delete a file or folder.
> Remove-Item [-Path] <file/folder path> [-Recurse] [-Force] [more-params]

- `-Recurse` recursively delete the folder
- `-Force` forcibly delete

### Examples

```powershell
# Delete a folder
Remove-Item -Path 'D:\temp\Test Folder'

# Delete a file
Remove-Item -Path 'D:\temp\Test Folder\sample.txt'

# Forcibly delete a file (for hidden, readonly type files)
Remove-Item -Path 'D:\temp\Test Folder\sample.txt' -Force

# Delete a folder recursively
Remove-Item -Path 'D:\temp\Test Folder' -Recurse

# Delete contents of a folder but not delete folder
Get-ChildItem -Path 'D:\cmd\ps1' -Include * | Remove-Item -Force -Recurse
```

## Moving
### `Move-Item`
We use the `Move-Item` cmdlet to move a file / foler to a different location.
> Move-Item [-Path] <path> [-Destination] <destination> [additional-params]

Parameters used:
- `-Force` forcibly move

```powershell
# Move folder 'trial' to a new location with new name 'tested'
Move-Item 'D:\temp\trial' 'D:\temp\abc\tested'

# Move file 'sample.txt' to a new location with new name 'verified.txt'
Move-Item -Path 'D:\temp\sample.txt' -Destination 'D:\temp\abc\verified.txt'
```

## Renaming
### `Rename-Item`
Renames a file or folder. The syntax is similar to `Move-Item`
We use the `Rename-Item` cmdlet to move a file / foler to a different location.
> Rename-Item [-Path] <path> [-NewName] <new-name> [additional-params]

## Get contents of a file
### `Get-Content`
The cmdlet `Get-Content` reads the contents of a file and returns an object. Syntax:
> Get-Content [-Path] <filename> [params]

The resulting object has a lot of members that can be used to manipulate file contents

## Set contents of a file
### `Set-Content`
The cmdlet can be used to set the contents of a file.

```powershell
# Read last 2 lines of file and the save as another file
# use the pipe symbol to send output of one cmdlet as input of other cmdlet
Get-Content .\lines.txt -Tail 2 | Set-Content last2lines.txt
```

## File or Folder exists
### `Test-Path`
Use the `Test-Path` cmdlet to check if a file or folder exists. The result is a boolean true or false. Syntax:
> Test-Path {file/folder}

## Clear contents of a file
### `Clear-Content`
We can use the `Clear-Content` cmdlet to clear the contents of a file. Syntax:
> Clear-Content [-Path] {file-path}

## Append data to a file
#### `Add-Content`
We can use the `Add-Content` cmdlet to append more contents to file
> Add-Content [-Path] {file-path} [-Value] {additiona-contents-to-append}




