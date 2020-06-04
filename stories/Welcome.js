export default {
  name: "welcome",
  props: {
    showApp: {
      type: Function,
    },
  },

  data() {
    return {
      main: {
        padding: 15,
        lineHeight: 1.4,
        fontFamily:
          '"Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif',
        backgroundColor: "#ffffff",
      },

      logo: {
        width: 200,
      },

      link: {
        color: "#1474f3",
        textDecoration: "none",
        borderBottom: "1px solid #1474f3",
        paddingBottom: 2,
      },

      code: {
        fontSize: 15,
        fontWeight: 600,
        padding: "2px 5px",
        border: "1px solid #eae9e9",
        borderRadius: 4,
        backgroundColor: "#f3f2f2",
        color: "#3a3a3a",
      },

      note: {
        opacity: 0.5,
      },
    };
  },

  template: `
    <div :style="main">
      <h1>Welcome to CloudyBADGE Storybook</h1>
      <p>
        This is the playground for components, colors and icons used within CloudyBadge
      </p>      
    </div>
  `,

  methods: {
    onClick(event) {
      event.preventDefault();
      this.showApp();
    },
  },
};
