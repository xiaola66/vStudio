import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AceEditor from 'react-ace';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import 'brace/theme/tomorrow';
import 'brace/mode/javascript';
import 'brace/mode/html';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/mode/lua';
import 'brace/mode/xml';
import 'brace/mode/ruby';
import 'brace/mode/sass';
import 'brace/mode/markdown';
import 'brace/mode/mysql';
import 'brace/mode/json';
import 'brace/mode/css';
import 'brace/mode/typescript';

const style = theme => ({
  root: {
    border: '1px solid rgba(207,207,207,1)',
  },
});
function ReactAce(props: IReactAce) {
  const { classes, getAceValue } = props;
  const [codeValue, setCodeValue] = useState('');

  const onCodeChange = value => {
    setCodeValue(value);
    getAceValue(value);
  };

  return (
    <AceEditor
      className={classes.root}
      name="vStudioCodeEditor"
      placeholder=""
      mode="javascript"
      theme="tomorrow"
      width="100%"
      height="100%"
      fontSize={14}
      value={codeValue}
      showPrintMargin={false}
      showGutter={true}
      highlightActiveLine={true}
      onChange={value => onCodeChange(value)}
      // onBlur={() => onBlur()}
      setOptions={{
        enableLiveAutocompletion: true,
        showLineNumbers: true,
        enableSnippets: true,
        tabSize: 4,
      }}
    />
  );
}

export default withStyles(style)(ReactAce);
