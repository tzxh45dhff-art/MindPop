from app.services.auth_service import fake_users_db

# Learning styles — expanded options
LEARNING_STYLES = [
    "Visual",
    "Interactive",
    "Theoretical",
    "Auditory",
    "Kinesthetic",
    "Social"
]

# Grade-specific subjects — different subjects per grade level
GRADE_SUBJECTS = {
    "9": [
        {"id": "Math", "icon": "calculate", "title": "Mathematics", "desc": "Algebra & Geometry"},
        {"id": "Science", "icon": "science", "title": "General Science", "desc": "Earth & Life Sciences"},
        {"id": "English", "icon": "menu_book", "title": "English", "desc": "Grammar & Composition"},
        {"id": "SocialStudies", "icon": "public", "title": "Social Studies", "desc": "Civics & Geography"},
        {"id": "ComputerScience", "icon": "computer", "title": "Computer Science", "desc": "Intro to Programming"},
        {"id": "Art", "icon": "palette", "title": "Art & Design", "desc": "Visual Arts & Creativity"},
        {"id": "PE", "icon": "fitness_center", "title": "Physical Education", "desc": "Health & Fitness"},
        {"id": "ForeignLanguage", "icon": "translate", "title": "Foreign Language", "desc": "Spanish, French, etc."},
    ],
    "10": [
        {"id": "Biology", "icon": "biotech", "title": "Biology", "desc": "Genetics & Ecology"},
        {"id": "Chemistry", "icon": "science", "title": "Chemistry", "desc": "Atoms & Reactions"},
        {"id": "Geometry", "icon": "square_foot", "title": "Geometry", "desc": "Proofs & Theorems"},
        {"id": "WorldHistory", "icon": "history_edu", "title": "World History", "desc": "Civilizations & Wars"},
        {"id": "English10", "icon": "menu_book", "title": "English Literature", "desc": "Novels & Essays"},
        {"id": "ComputerScience", "icon": "computer", "title": "Computer Science", "desc": "Data & Algorithms"},
        {"id": "Economics", "icon": "account_balance", "title": "Economics", "desc": "Micro & Macro"},
        {"id": "ForeignLanguage", "icon": "translate", "title": "Foreign Language", "desc": "Spanish, French, etc."},
    ],
    "11": [
        {"id": "Physics", "icon": "science", "title": "Physics", "desc": "Mechanics & Energy"},
        {"id": "Chemistry", "icon": "science", "title": "Chemistry", "desc": "Organic & Inorganic"},
        {"id": "Calculus", "icon": "functions", "title": "Calculus", "desc": "Limits & Derivatives"},
        {"id": "USHistory", "icon": "history_edu", "title": "US History", "desc": "Constitution & Civil War"},
        {"id": "Literature", "icon": "menu_book", "title": "Literature", "desc": "Analysis & Composition"},
        {"id": "Psychology", "icon": "psychology", "title": "Psychology", "desc": "Mind & Behavior"},
        {"id": "ComputerScience", "icon": "computer", "title": "AP Comp Sci", "desc": "Java & Problem Solving"},
        {"id": "Statistics", "icon": "bar_chart", "title": "Statistics", "desc": "Probability & Data"},
    ],
    "12": [
        {"id": "APPhysics", "icon": "science", "title": "AP Physics", "desc": "Electromagnetism & Waves"},
        {"id": "APCalcBC", "icon": "functions", "title": "AP Calculus BC", "desc": "Integrals & Series"},
        {"id": "APBiology", "icon": "biotech", "title": "AP Biology", "desc": "Molecular & Cellular"},
        {"id": "APChemistry", "icon": "science", "title": "AP Chemistry", "desc": "Reactions & Thermo"},
        {"id": "Philosophy", "icon": "psychology", "title": "Philosophy", "desc": "Logic & Ethics"},
        {"id": "APLiterature", "icon": "menu_book", "title": "AP Literature", "desc": "Critical Analysis"},
        {"id": "Government", "icon": "gavel", "title": "Government & Politics", "desc": "Policy & Law"},
        {"id": "APCompSci", "icon": "computer", "title": "AP Comp Sci A", "desc": "Advanced Programming"},
    ]
}

# Expanded learning style details for the frontend
LEARNING_STYLE_DETAILS = [
    {"id": "Visual", "icon": "visibility", "title": "Visual", "desc": "Infographics, video lectures, and mind maps.", "color": "bg-accent-lime"},
    {"id": "Interactive", "icon": "touch_app", "title": "Interactive", "desc": "Quizzes, flashcards, and group challenges.", "color": "bg-accent-blue"},
    {"id": "Theoretical", "icon": "menu_book", "title": "Theoretical", "desc": "In-depth readings, case studies, and papers.", "color": "bg-white"},
    {"id": "Auditory", "icon": "headphones", "title": "Auditory", "desc": "Podcasts, discussions, and verbal explanations.", "color": "bg-amber-200"},
    {"id": "Kinesthetic", "icon": "sports_handball", "title": "Kinesthetic", "desc": "Hands-on labs, experiments, and projects.", "color": "bg-purple-200"},
    {"id": "Social", "icon": "groups", "title": "Social", "desc": "Study groups, peer teaching, and collaboration.", "color": "bg-pink-200"},
]

def get_profile_options():
    """Returns all options including grade-specific subjects and learning style details."""
    return {
        "grades": list(GRADE_SUBJECTS.keys()),
        "learning_styles": LEARNING_STYLES,
        "grade_subjects_map": {
            grade: [s["id"] for s in subjects]
            for grade, subjects in GRADE_SUBJECTS.items()
        },
        "grade_subjects_details": GRADE_SUBJECTS,
        "learning_style_details": LEARNING_STYLE_DETAILS,
    }

def update_user_profile(profile_data):
    """Save the user's onboarding selections."""
    user_record = next(
        (u for u in fake_users_db.values() if u['username'] == profile_data.username),
        None
    )

    if not user_record:
        return None

    user_record['grade'] = profile_data.grade
    user_record['subjects'] = profile_data.subjects
    user_record['learning_style'] = profile_data.learning_style
    user_record['onboarding_complete'] = True

    return user_record
