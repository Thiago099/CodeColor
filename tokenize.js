const colors ={
    "Word": "yellow",
    "Number": "cyan",
    "Symbol": "red",
    "Space": "white",
}

function ParseCharType(m)
{
    if(m == '_') return 'Word';
         if(m < 'A')
         if(m < '0')
         if(m < '"') return 'Space';
    else             return 'Symbol';
    else if(m < ':') return 'Number';
    else             return 'Symbol';
    else if(m < 'a')
         if(m < '[') return 'Word';//return 'A'
    else             return 'Symbol';
    else if(m < '{') return 'Word';
    else             return 'Symbol';
}

function SplitByCharType(text)
{
    const result = []
    let Type = ParseCharType(text[0]);
    let current = Type;
    let index = 0;
    while(index < text.length)
    {
        const start =  index;

        while(current == Type && index < text.length)
        {
            index++;
            current = ParseCharType(text[index]);
        }
        result.push({
            Type: Type,
            Value: text.substring(start, index)
        });
        Type = current;
    }
    return result
}

function Colorize(text)
{
    const split = SplitByCharType(text);
    var result = ""
    for(const item of split)
    {
        result += `<span style="color:${colors[item.Type]}">${item.Value}</span>`
    }
    return result;
}

export {Colorize};