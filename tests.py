from os import listdir
from os.path import isfile, join
import re


class ScriptTest:
    MacroList = {}

    def __init__(self, name):
        self.name = name
        self.content = ''
        self.insert = {
            'rel': 'after',
            'target': 'end'
        }
        self.loadFile()
        
    def loadFile(self):
        tFile = ''
        with open ('./src/test/'+self.name+'.js', "r") as myfile:
            tFile=myfile.read()
        m=re.match(r'^\/\/\s+\+@insert\s+(?:(before|after)\:)?(.*?)\s*$', tFile, re.MULTILINE + re.IGNORECASE)
        if(m is not None):
            if(m.group(1) is not None):
                self.insert['rel'] = m.group(1)
            self.insert['target'] = m.group(2)
            tFile=tFile.replace(m.group(0) + "\n", "")
        self.content = tFile
        
    def insertTest(self, str):
        ret = str
        if(self.insert['target'] == 'end'):
            ret = ret + self.content
        else:
            print(self.insert['target'])
            pattern = re.compile(r"[^\S\r\n]*(?<!\w)ImportScript\([\'\"]"+self.insert['target']+"[\'\"]\)\;?[^\S\r\n]*", re.MULTILINE)
            m=pattern.search(ret)
            
            if(m is not None):
                if(self.insert['rel'] == 'before' and self.insert['target'] != "end"):
                    print('insert before ' + self.insert['target'])
                    #ret = ret.replace('{{{'+self.insert['target']+'}}}', self.content + '\n{{{'+self.insert['target']+'}}}')
                    ret = ret.replace(m.group(0), self.content + "\n" + m.group(0))
                else:
                    ret = ret.replace(m.group(0), m.group(0) + "\n" + self.content)
                    #ret = ret.replace('{{{'+self.insert['target']+'}}}', '{{{'+self.insert['target']+'}}}\n' + self.content)
            '''
            m=re.match('{{{' + self.insert['target'] + '}}}', ret, re.MULTILINE + re.IGNORECASE)
            if(m is not None):
                if(self.insert['rel'] == 'before'):
                    print('insert before ' + self.insert['target'])
                    ret = ret[0:m.start(0) - 1] + self.content + ret[m.start(0) - 1:]
                else:
                    print('insert after ' + self.insert['target'])
                    ret = ret[0:m.end(0) + 1] + self.content + ret[m.start(0) + 1:]
            '''
        return ret