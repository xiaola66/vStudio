interface row {
  name?: string;
  code?: string;
  age?: string;
  population?: number;
}
interface Column {
  id: string;
  columnName: string;
  columnUnit?: string;
  columnType?: string;
  columnCommmit?: string;
}

interface DataPreview {
  classes: any;
  dataTitle: Column[];
  dataContent: row[];
  description?: string[];
  selectTable?: string;
  handleSelectTable?: Function;
}
