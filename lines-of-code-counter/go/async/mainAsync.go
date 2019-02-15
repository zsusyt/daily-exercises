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

var config map[string]bool
var sum int64
var unfinishedFiles []string
var signalCh = make(chan int64)
var startTime time.Time

func init () {
	sum = 0
	config = make(map[string]bool)
	unfinishedFiles = make([]string, 0)
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

	startTime = time.Now()
	defer func() {
		// 计算程序运行时间
		endTime := time.Since(startTime)
		fmt.Println(fmt.Sprintf("%s", endTime))
	}()
	for _, file := range files {
		readChild(*projectPath, file)
	}

	for _, filePath := range unfinishedFiles {
		go countFileLine(filePath)
	}
	for i:=0; i<len(unfinishedFiles); i++ {
		select {
		case count := <- signalCh:
			sum += count
		}
	}
	fmt.Println("总行数为：", sum)
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
			unfinishedFiles = append(unfinishedFiles, newPath)
		}
	}
}

func countFileLine(name string) {
	data, _ := ioutil.ReadFile(name)
	count := 0
	for i := 0; i < len(data); i++ {
		if data[i] == '\n' {
			count++
		}
	}
	signalCh <- int64(count)
}