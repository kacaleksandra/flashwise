import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface ICategories {
  label: string;
  values: string[];
}

interface CategoryTabsProps {
  categories: ICategories[];
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

export default function CategoryTabs({ categories }: CategoryTabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="basic tabs example"
        >
          {categories.map((item, index) => (
            <Tab label={item.label} key={index} />
          ))}
        </Tabs>
      </Box>
      {categories.map((item, index) => (
        <TabPanel value={value} index={index} key={index}>
          <div className="sm:grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {item.values.map((value, valueIndex) => (
              <div
                key={valueIndex}
                className="p-7 m-6 bg-blue-500 text-white text-center shadow-xl rounded-md flex items-center justify-center"
              >
                <Link href="/">{value}</Link>
              </div>
            ))}
          </div>
        </TabPanel>
      ))}
    </Box>
  );
}
