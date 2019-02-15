package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"time"
)
//todo 计时

//todo buffio

//todo goroutine

var config map[string]bool
var sum int64

func init () {
	sum = 0
	config = make(map[string]bool)
	config["js"] = true
	config["vue"] = true
}

func main () {
	//projectPath := flag.String("pp", "E:\\sourceCode\\isp-fe\\src", "请提供想要统计的工程路径")
	projectPath := flag.String("pp", "/Users/zsusyt/works/lvshou/isp-fe/src", "请提供想要统计的工程路径")
	flag.Parse()
	fmt.Println(*projectPath)

	_, err := os.Lstat(*projectPath)
	if err != nil {
		fmt.Println("读取工程路径出错")
	}

	files, err := ioutil.ReadDir(*projectPath)
	if err != nil {
		fmt.Println("读取工程路径内的文件出错")
	}

	startTime := time.Now();
	defer func() {
		// 计算程序运行时间
		endTime := time.Since(startTime)
		fmt.Println(fmt.Sprintf("%s", endTime))
	}()
	for _, file := range files {
		readChild(*projectPath, file)
	}

	fmt.Println("总行数为:", sum)

}

func readChild(parent string, child os.FileInfo) {

	newPath := filepath.Join(parent, child.Name())
	if child.IsDir() {
		files, _ := ioutil.ReadDir(newPath)
		for _, file := range files {
			readChild(newPath, file)
		}
	} else {
		//fmt.Println(child.Name(),"is a file.")
		ext := filepath.Ext(child.Name())[1:]
		if config[ext] {
			//读取文件，计算行数加到sum上
			count, err := countFileLine(newPath)
			if err != nil {
				fmt.Println("读取文件时出错")
			}
			sum += count
		}
	}
}

func countFileLine(name string) (count int64, err error) {
	data, err := ioutil.ReadFile(name)
	if err != nil {
		return
	}
	count = 0
	for i := 0; i < len(data); i++ {
		if data[i] == '\n' {
			count++
		}
	}
	return
}