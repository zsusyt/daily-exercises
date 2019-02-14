package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
)

func main () {
	projectPath := flag.String("pp", "E:\\sourceCode\\isp-fe\\src", "请提供想要统计的工程路径")
	flag.Parse()
	fmt.Println(*projectPath)

	fi, err := os.Lstat(*projectPath)
	if err != nil {
		fmt.Println("读取工程路径出错")
	}

	fmt.Println("fi is a Dir:", fi.IsDir())

	files, err := ioutil.ReadDir(*projectPath)
	if err != nil {
		fmt.Println("读取工程路径内的文件出错")
	}

	for _, file := range files {
		if file.IsDir() {
			fmt.Println("=====================")
			absFilePath, err := filepath.Abs(file.Name())
			fmt.Println(absFilePath)
			files, err := ioutil.ReadDir(absFilePath)
			if err != nil {
				fmt.Println("读取子文件夹出错")
			}

			for _, file := range files {
				fmt.Println(file.Name(),"is a Dir?", file.IsDir())
			}
		} else {
			fmt.Println(file.Name(),"is a file.")
		}

	}

}

//func calcDirLines
